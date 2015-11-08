SUBMISSIONS = $(SRC) $(HEADER) Makefile README

all: $(TESTEXE)

depend:
        makedepend -Y $(SRC)
clean:
        rm -f $(OBJ) $(EXE)

testdeq: testdeq.o $(LIBOBJ)

testperf: testperf.o $(LIBOBJ)

submit:
        rm -rf Submit
        mkdir Submit
        cp $(SUBMISSIONS) Submit

archive:
        rm -rf deque deque.tar.gz
        mkdir deque
        cp $(SUBMISSIONS) deque
        tar -cf deque.tar deque
        gzip deque.tar
